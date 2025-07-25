using System.Text.Json.Serialization;

namespace Ecommerce_ElasticSearchProject.Models
{
	public class Phones
	{
        [JsonPropertyName("id")]
		public string Id { get; set; } = null!;

		[JsonPropertyName("name")]
		public string Name { get; set; }

		[JsonPropertyName("brand")]
		public string Brand { get; set; }

		[JsonPropertyName("model")]
		public string Model { get; set; }

		[JsonPropertyName("color")]
		public string Color { get; set; }

		[JsonPropertyName("price")]
        public double Price { get; set; }

		[JsonPropertyName("features")]
		public Features Features { get; set; }

		[JsonPropertyName("sort")]
		public int Sort { get; set; }


		[JsonPropertyName("image")]
		public string Image { get; set; }

		[JsonPropertyName("storage")]
		public int Storage { get; set; }

		[JsonPropertyName("width")]
		public string Width { get; set; }

		[JsonPropertyName("rating")]
		public double Rating { get; set; }

	}
    public class Features
    {
		[JsonPropertyName("face_id")]
		public bool FaceId { get; set; }

		[JsonPropertyName("os")]
		public string Os { get; set; }

		[JsonPropertyName("s_pen")]
		public bool SPen { get; set; }

		[JsonPropertyName("wireless_charging")]
		public bool WirelessCharging { get; set; }
    }

	public class Specs
	{
		[JsonPropertyName("width")]
		public string Width { get; set; }

		[JsonPropertyName("os")]
		public string Os { get; set; }
	}
}
