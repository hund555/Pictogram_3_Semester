using MongoDB.Bson;
using PictogramAPI.Domain;
using PictogramAPI.Services.DTOCollection;

namespace PictogramAPI.Services.MapPictogramDTOCollection
{
    public static class MapPictogramDTO
    {
        /// <summary>
        /// Map CreatePictogramDTO to Pictogram domain object with provided GridFS id
        /// </summary>
        /// <param name="pictogramDTO"></param>
        /// <param name="gridFsId"></param>
        /// <returns></returns>
        public static Pictogram MapCreatePictogramDTOToPictogramDomain(this CreatePictogramDTO pictogramDTO, ObjectId gridFsId)
        {
            return new Pictogram
            {
                PictogramId = Guid.NewGuid().ToString(),
                Title = pictogramDTO.Title,
                Description = pictogramDTO.Description,
                FileType = pictogramDTO.FileType,
                IsPrivate = pictogramDTO.IsPrivate,
                UserId = pictogramDTO.UserId,
                GridFsId = gridFsId.ToString()
            };
        }
    }
}
