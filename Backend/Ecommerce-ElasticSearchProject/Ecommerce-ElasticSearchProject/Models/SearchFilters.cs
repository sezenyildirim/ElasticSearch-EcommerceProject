using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;

namespace Ecommerce_ElasticSearchProject.Models
{
	public class SearchFilters
	{

		public List<string>? Brands { get; set; }


		public List<int>? Storage { get; set; }


		public FeaturesDetail? Features { get; set; }
		public List<double>? Ratings { get; set; }

		[FromQuery(Name = "priceRange.Min")]
		public double? MinPrice { get; set; }

		[FromQuery(Name = "priceRange.Max")]
		public double? MaxPrice { get; set; }


	}

	public class FeaturesDetail
	{
		[FromQuery(Name = "face_id")]
		public bool? FaceId { get; set; }

		[FromQuery(Name = "s_pen")]
		public bool? SPen { get; set; }

		[FromQuery(Name = "wireless_charging")]
		public bool? WirelessCharging { get; set; }
	}
}
