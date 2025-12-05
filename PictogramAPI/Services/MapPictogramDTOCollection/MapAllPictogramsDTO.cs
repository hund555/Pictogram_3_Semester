using PictogramAPI.Domain;
using PictogramAPI.Services.DTOCollection.PictogramDTOs;
using System.Runtime.CompilerServices;

namespace PictogramAPI.Services.MapPictogramDTOCollection
{
    public static class MapAllPictogramsDTO
    {

        public static DisplayAllPictogramsDTO MapPictogramDomainToDisplayAllPictogramsDTO(this Pictogram pictogram)
        {
            return new DisplayAllPictogramsDTO
            {
                PictogramId = pictogram.PictogramId,
                Title = pictogram.Title,
                Description = pictogram.Description,
                FileType = pictogram.FileType,
                IsPrivate = pictogram.IsPrivate,
                Picture = pictogram.PictureBytes != null ? Convert.ToBase64String(pictogram.PictureBytes) : null,
                UserId = pictogram.UserId
            };
        }         
    }
}
