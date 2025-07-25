using Ecommerce_ElasticSearchProject.Models;
using Ecommerce_ElasticSearchProject.Repositories;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Ecommerce_ElasticSearchProject.Services
{
	public class ECommerceService
	{
		private readonly ECommerceRepository _repository;

		public ECommerceService(ECommerceRepository repository)
		{
			_repository = repository;
		}

		public async Task<PagedResult<Phones>> ListAsync(int page, int pageSize)
		{
			try
			{
				var result = await _repository.ListAsync(page, pageSize);
				long pageLink = 0;
				var pageLinkCount = result.TotalCount % pageSize;
				if (pageLinkCount == 0)
				{
					pageLink = result.TotalCount / pageSize;

				}
				else
				{
					pageLink = (result.TotalCount / pageSize) + 1;
				}
				return new PagedResult<Phones>
				{
					Items = result.Items,
					CurrentPage = result.CurrentPage,
					PageSize = result.PageSize,
					TotalCount = result.TotalCount,
					TotalPages = result.TotalPages
				};

			}
			catch (Exception)
			{

				throw;
			}
		}



		public async Task<Phones> GetByIdAsync(string id)
		{
			try
			{
				var result = await _repository.GetByIdAsync(id);
				return result;
			}
			catch (Exception)
			{

				throw;
			}
		}

		public async Task<PagedResult<Phones>> SearchAsync(string searchText, int page, int pageSize)
		{
			try
			{
				var result =  await _repository.SearchAsync(searchText,page, pageSize);
				long pageLink = 0;
				var pageLinkCount = result.TotalCount % pageSize;
				if (pageLinkCount == 0)
				{
					pageLink = result.TotalCount / pageSize;

				}
				else
				{
					pageLink = (result.TotalCount / pageSize) + 1;
				}

				var eCommerceList = result.Items.Select(x => new Phones
				{
					Id = x.Id,
					Name = x.Name,
					Brand = x.Brand,
					Model = x.Model,
					Price = x.Price,
					Storage = x.Storage,
					Color = x.Color,
					Features = x.Features,
					Image = x.Image,
					Rating = x.Rating

				}).ToList();

				return new PagedResult<Phones>
				{
					Items = result.Items,
					CurrentPage = result.CurrentPage,
					PageSize = result.PageSize,
					TotalCount = result.TotalCount,
					TotalPages = result.TotalPages
				};
			}
			catch (Exception)
			{

				throw;
			}
		}

		public async Task<PagedResult<Phones>> SearchFiltersAsync(SearchFilters filters, int page, int pageSize)
		{
			try
			{
				var result = await _repository.SearchFiltersAsync(filters, page, pageSize);
				long pageLink = 0;
				var pageLinkCount = result.TotalCount % pageSize;
				if (pageLinkCount == 0)
				{
					pageLink = result.TotalCount / pageSize;

				}
				else
				{
					pageLink = (result.TotalCount / pageSize) + 1;
				}

				var eCommerceList = result.Items.Select(x => new Phones
				{
					Id = x.Id,
					Name = x.Name,
					Brand = x.Brand,
					Model = x.Model,
					Price = x.Price,
					Storage = x.Storage,
					Color = x.Color,
					Features = x.Features,
					Image = x.Image,
					Rating = x.Rating

				}).ToList();

				return new PagedResult<Phones>
				{
					Items = result.Items,
					CurrentPage = result.CurrentPage,
					PageSize = result.PageSize,
					TotalCount = result.TotalCount,
					TotalPages = result.TotalPages
				};
			}
			catch (Exception)
			{

				throw;
			}
		}

		//public async Task<bool> UpdateSortAsync()
		//{
		//	try
		//	{
		//		var result = await _repository.UpdateSortAsync();
		//		return result;
		//	}
		//	catch (Exception)
		//	{

		//		throw;
		//	}
		//}
	}
}
