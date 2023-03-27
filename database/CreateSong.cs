using api.Interfaces;
using api.Models;
using MySql.Data.MySqlClient;

namespace api.database
{
    public class CreateSong : ISaveSong
    {
        public void SaveSong(Song mySong,int id)
        {   
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();


            string stm = @$"UPDATE songs
                            SET 
                                title = '{mySong.Title}',
                                artist = '{mySong.Artist}',
                                favorited = {mySong.Favorited},
                                deleted = {mySong.Deleted}
                            WHERE song_id = {id};";

            using var cmd = new MySqlCommand(stm, con);

            int affected = cmd.ExecuteNonQuery();
            System.Console.WriteLine("rows affected:" + affected);
            con.Close();
        }
        void ISaveSong.CreateSong(Song mySong)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            DateTime dtNow = DateTime.Now;

            string stm = @$"INSERT INTO songs(title, artist, datetime_added)
                            VALUES('{mySong.Title}', '{mySong.Artist}', '{dtNow.ToString("yyyy-MM-dd HH:mm:ss.fff")}')";

            using var cmd = new MySqlCommand(stm, con);

            cmd.ExecuteNonQuery();
            con.Close();
        }
    }
}