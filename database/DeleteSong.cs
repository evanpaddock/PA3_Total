using api.Interfaces;
using api.Models;
using MySql.Data.MySqlClient;

namespace api.database
{
    public class DeleteSong : IDeleteSong
    {
        void IDeleteSong.DeleteSong(Song mySong)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();
            
            string stm = @$"UPDATE songs 
                            SET deleted = NOT deleted
                            WHERE song_id = {mySong.ID};";
            
            using var cmd = new MySqlCommand(stm, con);

            cmd.ExecuteNonQuery();
            con.Close();
        }
    }
}