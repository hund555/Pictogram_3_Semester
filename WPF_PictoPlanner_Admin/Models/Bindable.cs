using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace WPF_PictoPlanner_Admin.Models
{
    public abstract class Bindable : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler? PropertyChanged;

        protected void propertyIsChanged([CallerMemberName] string memberName = "")
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(memberName));
        }
    }
}
