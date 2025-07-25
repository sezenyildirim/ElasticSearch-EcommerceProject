using Ecommerce_ElasticSearchProject.Models;
using Elastic.Clients.Elasticsearch;
using Elastic.Clients.Elasticsearch.QueryDsl;
using Elastic.Clients.Elasticsearch.Aggregations;
using Elastic.Clients.Elasticsearch.Core.TermVectors;
using Elastic.Clients.Elasticsearch.Core.Bulk;
using System.Numerics;
using Elastic.Clients.Elasticsearch.Core.Search;
using Elastic.Clients.Elasticsearch.Nodes;


namespace Ecommerce_ElasticSearchProject.Repositories
{
	public class ECommerceRepository
	{
		private readonly ElasticsearchClient _client;
		private const string indexName = "phones_v2";

		public ECommerceRepository(ElasticsearchClient client)
		{
			_client = client;
		}



		public async Task<PagedResult<Phones>> ListAsync(int page, int pageSize)
		{


			if (page <= 0)
			{
				page = 1;
			}
			var pageFrom = (page - 1) * pageSize;

	

			var phonesInModel = await _client.SearchAsync<Phones>(s => s
.Index(indexName)
.Size(100)
.Query(q => q
.MatchAll(new MatchAllQuery()))
.Sort(s => s
	.Field(new Field("sort"), new FieldSort
	{
		Order = SortOrder.Asc
	})
)
);











			//			var phonesInModel = await _client.SearchAsync<Phones>(s => s
			//	.Index("phones")
			//	.From(pageFrom)
			//	.Query(q => q
			//		.MatchAll()
			//	).Sort(s => s
			//	.Field(new Field("sort"), new FieldSort
			//	{
			//		Order = SortOrder.Asc
			//	})
			//)
			//);


			if (phonesInModel.Documents.Count > 0)
					{

				var totalCount = phonesInModel.Documents.Count;


						var documentList = phonesInModel.Documents.ToList();
						var hitsList = phonesInModel.Hits.ToList();

						for (int i = 0; i < documentList.Count(); i++)
						{
							if (i < phonesInModel.Hits.Count)
							{
								documentList[i].Id = hitsList[i].Id;

							}
						}

						//var totalCount = documentList.Count;

						var items =  documentList.Skip(pageFrom).Take(pageSize).ToList();
						var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

						return new PagedResult<Phones>
						{
							Items = items,
							TotalPages = totalPages,
							TotalCount = totalCount,
							PageSize = pageSize,
							CurrentPage = page
						};

					}
			return new PagedResult<Phones>();

			

			
		}

		#region modele göre her türden 1 item listeler

		//		public async Task<PagedResult<Phones>> ListAsync(int page, int pageSize)
		//		{
		//			if(page <= 0)
		//			{
		//				page = 1;
		//			}
		//			var pageFrom = (page - 1) * pageSize;


		//			var response = await _client.SearchAsync<Phones>(s => s
		//				.Index(indexName)
		//				.From(pageFrom)
		//				.Size(pageSize)
		//				.Aggregations(a => a
		//					.Terms("model_groups", t => t
		//						.Field("model.keyword")
		//						.Size(100)
		//					)
		//				)
		//			);

		//			if (!response.IsValidResponse || response.Aggregations is null)
		//				return new PagedResult<Phones>();


		//			if (response.Aggregations.TryGetValue("model_groups", out var agg) &&
		//	agg is StringTermsAggregate stringTermsAgg)
		//			{



		//				foreach (var bucket in stringTermsAgg.Buckets)
		//				{
		//					string model = bucket.Key.ToString();

		//					var phonesInModel = await _client.SearchAsync<Phones>(s => s
		//	.Index("phones")
		//	.Query(q => q
		//		.Term(t => t
		//			.Field(f => f.Model.Suffix("keyword"))
		//			.Value(model)
		//		)
		//	).Sort(s => s
		//	.Field(new Field("sort"), new FieldSort
		//	{
		//		Order = SortOrder.Asc
		//	})
		//)

		//	.Size(1)
		//);

		//					if (phonesInModel.Documents.Count > 0)
		//					{




		//						var documentList = phonesInModel.Documents.ToList();
		//						var hitsList = phonesInModel.Hits.ToList();

		//						for (int i = 0; i < documentList.Count; i++)
		//						{
		//							if (i < phonesInModel.Hits.Count)
		//							{
		//								documentList[i].Id = hitsList[i].Id;

		//							}
		//						}

		//						var totalCount = documentList.Count;
		//						var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

		//						return new PagedResult<Phones>
		//						{
		//							Items = documentList,
		//							TotalPages = totalPages,
		//							TotalCount = totalCount,
		//							PageSize = pageSize,
		//							CurrentPage = page
		//						};

		//					}
		//				}

		//			}

		//			return new PagedResult<Phones>();
		//		}

		#endregion


		public async Task<Phones?> GetByIdAsync(string id)
		{
			var result = await _client.GetAsync<Phones>(id, x => x.Index(indexName));
			if (!result.IsSuccess())
			{
				return null;

			}
			result.Source.Id = id;

			return result.Source;
		}

		public async Task<PagedResult<Phones?>> SearchAsync(string searchText, int page, int pageSize)
		{

			if (page <= 0)
			{
				page = 1;
			}
			var pageFrom = (page - 1) * pageSize;

			searchText = searchText.Trim().ToLower();
			var result = await _client.SearchAsync<Phones>(s => s.Index(indexName)
				.From(pageFrom)
				.Size(pageSize)
				.Query(q => q.Bool(b => b.Should(
					s => s.Match(m => m.Field("name").Query(searchText).Fuzziness(new Fuzziness(1))),
					s => s.Match(m => m.Field("brand").Query(searchText).Fuzziness(new Fuzziness(1))),
					s => s.Match(m => m.Field("model").Query(searchText).Fuzziness(new Fuzziness(1))),
					s => s.Match(m => m.Field("color").Query(searchText).Fuzziness(new Fuzziness(1)))

				))));

			if (!result.IsSuccess() || result.Documents is null)
			{
				return new PagedResult<Phones?>();
			}

			foreach (var hit in result.Hits)
			{
				hit.Source.Id = hit.Id;
			}
			var totalCount = result.Total;
			var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

	

			return new PagedResult<Phones>
			{
				Items = result.Documents.ToList(),
				CurrentPage = page,
				PageSize = pageSize,
				TotalCount = totalCount,
				TotalPages = totalPages
			};

		}

		public async Task<PagedResult<Phones>> SearchFiltersAsync(SearchFilters searchFilters, int page, int pageSize)
		{
			List<Query> queries = new();

			if (searchFilters.Brands != null && searchFilters.Brands.Any())
			{
				queries.Add(new TermsQuery
				{
					Field = "brand.keyword",
					Terms = new TermsQueryField(searchFilters.Brands.Select(b => (FieldValue)b).ToList())
				});
			}

			
			if (searchFilters.Features != null)
			{
				if (searchFilters.Features != null)
				{
					if (searchFilters.Features.FaceId == true)
					{
						queries.Add(new TermQuery(new Field("features.face_id"))
						{
							Value = true
						});
					}

					if (searchFilters.Features.SPen == true)
					{
						queries.Add(new TermQuery(new Field("features.s_pen"))
						{
							Value = true
						});
					}

					if (searchFilters.Features.WirelessCharging == true)
					{
						queries.Add(new TermQuery(new Field("features.wireless_charging"))
						{
							Value = true
						});
					}
				}

			}

			if (searchFilters.Ratings != null && searchFilters.Ratings.Any())
			{
				queries.Add(new TermsQuery
				{
					Field = "rating",
					Terms = new TermsQueryField(searchFilters.Ratings.Select(b => (FieldValue)b).ToList())
				});
			}

			if (searchFilters.Storage != null && searchFilters.Storage.Any())
			{
				queries.Add(new TermsQuery
				{
					Field = "storage",
					Terms = new TermsQueryField(searchFilters.Storage.Select(b => (FieldValue)b).ToList())
				});
			}

			if (searchFilters.MinPrice == null) searchFilters.MinPrice = 0;
			if (searchFilters.MaxPrice == null) searchFilters.MaxPrice = 20000000;


			var minPrice = searchFilters.MinPrice;
			var maxPrice = searchFilters.MaxPrice;
			//if (minPrice != null || maxPrice != null)
			//{

			//	var rangeQuery = new Range
			//	{
				
			//	};

				

			//}

			if (page <= 0)
			{
				page = 1;
			}
			var pageFrom = (page - 1) * pageSize;


			Query query;


			if (queries.Any())
			{
				query = new BoolQuery
				{
					Must = queries
				};
			}
			else
			{
				query = new MatchAllQuery();
			}

			var result = await _client.SearchAsync<Phones>(s => s.Index(indexName).
			From(pageFrom)
			.Size(pageSize)
			.Query(query));


			foreach (var hit in result.Hits)
			{
				hit.Source.Id = hit.Id;
			}

			var totalCount = result.Total;
			var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

			return new PagedResult<Phones>
			{
				Items = result.Documents.ToList(),
				CurrentPage = page,
				PageSize = pageSize,
				TotalCount = totalCount,
				TotalPages = totalPages
			};

		}








	}

	#region sorting

	//public async Task<bool> UpdateSortAsync()
	//{

	//	var searchResult = await _client.SearchAsync<Phones>(s => s
	//		.Index(indexName)
	//		.Size(40) // Or whatever size is appropriate for your use case
	//	);

	//	if (!searchResult.IsValidResponse)
	//	{
	//		Console.WriteLine($"Error searching documents: {searchResult.ElasticsearchServerError?.Error}");
	//		return false;
	//	}

	//	var documentIds = searchResult.Hits.Select(h => h.Id).ToList();

	//	if (documentIds.Count == 0)
	//	{
	//		Console.WriteLine("No documents found to update.");
	//		return false;
	//	}


	//	var random = new Random();
	//	var randomValues = Enumerable.Range(1, documentIds.Count)
	//								 .OrderBy(_ => random.Next())
	//								 .ToList();


	//	var bulkOperations = new List<IBulkOperation>(); 

	//	for (int i = 0; i < documentIds.Count; i++)
	//	{
	//		var docId = documentIds[i];
	//		var sortValue = randomValues[i];


	//		var updateOperation = new BulkUpdateOperation<Phones, object>(docId)
	//		{
	//			Index = indexName, 
	//			Doc = new { sort = sortValue }
	//		};

	//		bulkOperations.Add(updateOperation);
	//	}


	//	var bulkRequest = new BulkRequest(indexName) // Optionally specify a default index for the bulk request
	//	{
	//		Operations = new BulkOperationsCollection(bulkOperations)
	//	};

	//	var bulkResponse = await _client.BulkAsync(bulkRequest);

	//	if (!bulkResponse.IsValidResponse)
	//	{
	//		Console.WriteLine("Bulk update failed:");
	//		Console.WriteLine(bulkResponse.DebugInformation); 
	//		Console.WriteLine(bulkResponse.ElasticsearchServerError?.ToString());

	//		foreach (var item in bulkResponse.ItemsWithErrors)
	//		{
	//			Console.WriteLine($"Error updating document {item.Id}: {item.Error.Reason}");
	//		}
	//		return false;
	//	}
	//	else
	//	{
	//		Console.WriteLine("Documents updated successfully.");
	//	}

	//	return true;
	//}

	#endregion


}








