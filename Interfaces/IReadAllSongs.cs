using api.Models;

namespace api.Interfaces
{
    public interface IReadSongs
    {
        public List<Song> GetAllSongs();
        public Song GetASong(int id);
    }
}