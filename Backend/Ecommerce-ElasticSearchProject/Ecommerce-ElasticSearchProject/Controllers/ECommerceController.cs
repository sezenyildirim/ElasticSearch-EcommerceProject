using Ecommerce_ElasticSearchProject.Models;
using Ecommerce_ElasticSearchProject.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce_ElasticSearchProject.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ECommerceController : ControllerBase
	{
		private readonly ECommerceService eCommerceService;

		public ECommerceController(ECommerceService eCommerceService)
		{
			this.eCommerceService = eCommerceService;
		}

		[HttpGet("List")]
		public async Task<IActionResult> GetAll([FromQuery] int page = 0, [FromQuery] int perPage = 9)
		{
			try
			{
				var result = await this.eCommerceService.ListAsync(page, perPage);
				return Ok(result);
			}
			catch (Exception)
			{

				throw;
			}
		}



		[HttpGet("GetById")]

		public async Task<IActionResult> GetById(string id)
		{
			try
			{
				var result = await this.eCommerceService.GetByIdAsync(id);
				return Ok(result);
			}
			catch (Exception)
			{

				throw;
			}
		}

		[HttpGet("SearchText")]
		public async Task<IActionResult> SearchByText([FromQuery] string searchText, [FromQuery] int page = 0, [FromQuery] int perPage = 9)
		{
			try
			{
				var result = await this.eCommerceService.SearchAsync(searchText, page, perPage);
				return Ok(result);
			}
			catch (Exception)
			{

				throw;
			}
		}

		[HttpGet("SearchFilters")]

		public async Task<IActionResult> SearchByFilters([FromQuery] SearchFilters filters, [FromQuery] int page = 0, [FromQuery] int perPage = 9)
		{
			try
			{
				var result = await this.eCommerceService.SearchFiltersAsync(filters, page, perPage);
				return Ok(result);
			}
			catch (Exception)
			{

				throw;
			}
		}

		//[HttpPut]

		//public async Task<IActionResult> UpdateSort()
		//{
		//	try
		//	{
		//		var result = await this.eCommerceService.UpdateSortAsync();
		//		return Ok(result);

		//	}
		//	catch (Exception)
		//	{

		//		throw;
		//	}
		//}


	}
}
