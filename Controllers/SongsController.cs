using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.database;
using api.Interfaces;

namespace api.Controllers
{
    [Route("api/Songs")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        //Create : POST
        //Read : GET
        //Update : PUT
        //Delete : DELETE

        // GET: api/Songs
        [HttpGet(Name = "GETsongs")]
        public List<Song> Get()
        {
            IReadSongs sr = new ReadSongs();
            List<Song> allSongs = sr.GetAllSongs();
            return allSongs;
        }

        // GET: api/Songs/5
        [HttpGet("{id}", Name = "GetSong")]
        public Song Get(int id)
        {
            IReadSongs sr = new ReadSongs();
            Song mySong = sr.GetASong(id);
            return mySong;
        }

        // POST: api/Songs
        [HttpPost(Name = "POSTSong")]
        public bool Post([FromBody] Song value)
        {
            ISaveSong crs = new CreateSong();

            try
            {
                crs.CreateSong(value);
                return true;
            }
            catch
            {
                return false;
            }
        }

        // PUT: api/Songs/5
        [HttpPut("{id}")]
        public void Put([FromBody] Song mySong, int id)
        {
            CreateSong crs = new CreateSong();

            crs.SaveSong(mySong, id);
        }

        // DELETE: api/Songs/5
        [HttpDelete("{id}", Name = "DELETESong")]
        public void Delete(int id)
        {
            
        }
    }
}
