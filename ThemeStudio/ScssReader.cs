using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.Ajax.Utilities;

namespace ThemeStudio
{

    public class ScssVariable
    {
        public ScssVariable(string key, string value)
        {
            Key = key;
            Value = value.Trim();
            Name = string.Join(" ", key.Replace("$", "").Split('-').Where(s => !string.IsNullOrWhiteSpace(s)).Select(s => s[0].ToString().ToUpper() + s.Substring(1)));
            Type = GetVarType();
        }

        private ScssVariableType GetVarType()
        {
            return Value.ToLower() == "transparent" || Value.StartsWith("#") ? ScssVariableType.Color : ScssVariableType.Unknown;
        }

        public string Name { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public ScssVariableType Type { get; set; }
    }

    public enum ScssVariableType
    {
        Unknown,
        Color
    }


    public static class ScssReader
    {
        public static IEnumerable<ScssVariable> ReadVariables(IEnumerable<string> fileNames)
        {
            return fileNames.SelectMany(ReadVariables).DistinctBy(v => v.Key);
        }

        public static IEnumerable<ScssVariable> ReadVariables(string fileName)
        {
            return File.ReadAllLines(fileName).Select(TryParseLine).Where(v => v != null).DistinctBy(v => v.Key);
        }

        public static string ConvertScssVariablesToCssVars(string scssFile, bool saveChangesToFile)
        {
            var content = File.ReadAllText(scssFile);
            var vars = ReadVariables(scssFile).Where(v => v.Type == ScssVariableType.Color);
            var builder = new StringBuilder(":root {");
            foreach (var var in vars)
            {
                string cssVarName = $"--{var.Key.Replace("$", "")}";
                //builder.AppendLine().AppendLine($"{cssVarName}: {var.Value};");
                builder.AppendLine().AppendLine(string.Format("{0}: {1};", cssVarName, "#{"+var.Key+"}"));

                //content = content.Replace($": {var.Key} ", $": var({cssVarName}) ");
                //content = content.Replace($":{var.Key} ", $":var({cssVarName}) ");
            }

            builder.AppendLine().AppendLine("}");
            
            //var result = builder.AppendLine() + content;
            var result = content + Environment.NewLine + builder.AppendLine();
            if (saveChangesToFile)
                File.WriteAllText(scssFile, result);
            return result;
        }

        private static ScssVariable TryParseLine(string line)
        {
            if (line.StartsWith("$"))
            {
                var parts = line.Split(':');
                if (parts.Length == 2)
                {
                    string key = parts[0];
                    string value = parts[1].Replace("!default;", "");
                    return new ScssVariable(key, value);
                }
            }
            return null;
        }
    }
}