namespace Ecommerce_ElasticSearchProject.Models
{
	public class PagedResult<T>
	{
		public List<T> Items { get; set; }
		public int CurrentPage { get; set; }
		public int PageSize { get; set; }
		public long TotalCount { get; set; }
		public int TotalPages { get; set; }
	}
}
