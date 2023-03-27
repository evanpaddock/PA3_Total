using api.Interfaces;
using api.Models;
using MySql.Data.MySqlClient;

namespace api.database
{
    public class ReadSongs : IReadSongs
    {
        public List<Song> GetAllSongs()
        {
            List<Song> allSongs = new List<Song>();

            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"SELECT * FROM songs";
            using var cmd = new MySqlCommand(stm, con);

            using MySqlDataReader rdr =  cmd.ExecuteReader();
            while(rdr.Read())
            {
                Song song = new Song(){
                    ID = rdr.GetInt32(0),
                    Title = rdr.GetString(1),
                    Artist = rdr.GetString(2),
                    Favorited = rdr.GetBoolean(3),
                    Deleted = rdr.GetBoolean(4),
                    DateTimeAdded = rdr.GetDateTime(5)
                    };

                    allSongs.Add(song);
            }

            con.Close();

            return allSongs;
        }

        public Song GetASong(int id)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @$"SELECT * FROM songs
                            WHERE song_id = {id}";
            using var cmd = new MySqlCommand(stm, con);

            using MySqlDataReader rdr =  cmd.ExecuteReader();

            rdr.Read();

            Song song = new Song(){
                ID = rdr.GetInt32(0),
                Title = rdr.GetString(1),
                Artist = rdr.GetString(2),
                Favorited = rdr.GetBoolean(3),
                Deleted = rdr.GetBoolean(4),
                DateTimeAdded = rdr.GetDateTime(5)
                };
            
            con.Close();

            return song;
        }
    }
}