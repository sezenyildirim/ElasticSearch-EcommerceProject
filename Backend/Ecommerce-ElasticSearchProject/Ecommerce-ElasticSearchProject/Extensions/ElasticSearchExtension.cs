﻿using Elastic.Clients.Elasticsearch;
using Elastic.Transport;

namespace Ecommerce_ElasticSearchProject.Extensions
{
	public static class ElasticSearchExtension
	{
		public static void AddElastic(this IServiceCollection services, IConfiguration configuration)
		{
			var userName = configuration.GetSection("Elastic")["Username"].ToString();
			var password = configuration.GetSection("Elastic")["Password"].ToString();
			var settings = new ElasticsearchClientSettings(new Uri(configuration.GetSection("Elastic")["Url"]!))
				.Authentication(new BasicAuthentication(userName,password));
			var client = new ElasticsearchClient(settings);
			services.AddSingleton(client);
		}
	}
}
