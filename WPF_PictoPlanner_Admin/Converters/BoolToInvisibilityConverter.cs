using System.Globalization;
using System.Windows;
using System.Windows.Data;

namespace WPF_PictoPlanner_Admin.Converters
{
    /// <summary>
    /// Value converter used to hide UI elements based on the boolean value; true
    /// </summary>
    public class BoolToInvisibilityConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            return (bool)value ? Visibility.Collapsed : Visibility.Visible;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
