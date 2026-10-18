namespace PeopleHub.Application.Common.Utilities;

/// <summary>Helpers for base64 / data-URI file payloads sent by the client.</summary>
public static class Base64Payload
{
    private const string Marker = "base64,";

    public static string StripDataUriPrefix(string value)
    {
        var index = value.IndexOf(Marker, StringComparison.OrdinalIgnoreCase);
        return index >= 0 ? value[(index + Marker.Length)..] : value;
    }

    public static byte[]? TryDecode(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        try
        {
            return Convert.FromBase64String(StripDataUriPrefix(value.Trim()));
        }
        catch (FormatException)
        {
            return null;
        }
    }
}
