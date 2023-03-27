using api.Models;

namespace api.Interfaces
{
    public interface ISaveSong
    {
        public void SaveSong(Song mySong, int id);
         public void CreateSong(Song mySong);
    }
}