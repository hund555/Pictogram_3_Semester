using System.Globalization;
using System.Windows;
using System.Windows.Data;
using System.Xml.Linq;

namespace WPF_PictoPlanner_Admin.Converters
{
    /// <summary>
    /// Value converter used to convert a boolean value to a Visibility value
    /// to control an UI element's visibility in XAML bindings.
    /// </summary>
    public class BoolToVisibilityConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            return (bool)value ? Visibility.Visible : Visibility.Collapsed;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
