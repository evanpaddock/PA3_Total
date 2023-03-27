namespace api
{
    public class ConnectionString
    {
        public String cs { get; set; }

        public ConnectionString()
        {
            string server = "bmlx3df4ma7r1yh4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "ybz7a6qgd21ye0d2";
            string port = "3306";

            string userName = "ern2x6y3bdye6ivy";
            string password = "odadme11xsprr9ws";

            cs = $@"server={server}; user={userName}; database={database}; port={port}; password={password};convert zero datetime=True";
        }
    }
}