using PictogramAPI.Domain;
using PictogramAPI.Services.DTOCollection.PictogramDTOs;

namespace PictogramAPI.Services.MapPictogramDTOCollection
{
    public static class MapPictogramDTO
    {
        /// <summary>
        /// Map CreatePictogramDTO to Pictogram domain
        /// </summary>
        /// <param name="pictogramDTO"></param>
        /// <param name="gridFsId"></param>
        /// <returns></returns>
        public static Pictogram MapCreatePictogramDTOToPictogramDomain(this CreatePictogramDTO pictogramDTO, byte[] pictureBytes)
        {
            return new Pictogram
            {
                PictogramId = Guid.NewGuid().ToString(),
                Title = pictogramDTO.Title,
                Description = pictogramDTO.Description,
                FileType = pictogramDTO.FileType,
                IsPrivate = pictogramDTO.IsPrivate,
                UserId = pictogramDTO.UserId,
                PictureBytes = pictureBytes
            };
        }


        /// <summary>
        /// Map UpdatePictogramDTO to PictogramDomain
        /// </summary>
        /// <param name="pictogramDTO"></param>
        /// <param name="pictureBytes"></param>
        /// <returns></returns>
        public static Pictogram MapUpdatePictogramDTOToPictogramDomaim(this UpdatePictogramDTO pictogramDTO, byte[] pictureBytes)
        {
            return new Pictogram
            {
                PictogramId = pictogramDTO.PictogramId,
                Title = pictogramDTO.Title,
                Description = pictogramDTO.Description,
                FileType = pictogramDTO.FileType,
                IsPrivate = pictogramDTO.IsPrivate,
                UserId = pictogramDTO.UserId,
                PictureBytes = pictureBytes
            };
        }

        /// <summary>
        /// Map PictogramDomain to DisplayAllPictogramsDTO
        /// </summary>
        /// <param name="pictogram"></param>
        /// <returns></returns>
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
