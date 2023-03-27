namespace api.Models
{
    public class Song
    {
        public int? ID{get; set;}
        public string? Title {get; set;}
        public string? Artist{get; set;}
        public DateTime? DateTimeAdded{get; set;}
        public bool? Favorited{get; set;}
        public bool? Deleted{get; set;}

        public override string ToString(){
             return $"{ID}, {Title}, {Artist}, {DateTimeAdded}, {Favorited}, {Deleted}";
        }
    }
}