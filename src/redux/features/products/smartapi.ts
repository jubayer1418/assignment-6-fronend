import { baseApi } from "../../api/baseapi";

export const smartapi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({
        name,
        brand,
        model,
        operatingSystem,
        storageCapacity,
        screenSize,
        camera,
        battery,
        minPrice,
        maxPrice,
        searchTerm,
        page,
        limit,
      }) => {
        const params = new URLSearchParams();
        if (name) {
          params.append("name", name);
        }
        if (camera) {
          params.append("camera", camera);
        }
        if (battery) {
          params.append("battery", battery);
        }
        if (model) {
          params.append("model", model);
        }
        if (operatingSystem) {
          params.append("operatingSystem", operatingSystem);
        }
        if (brand) {
          params.append("brand", brand);
        }
        if (storageCapacity) {
          params.append("storageCapacity", storageCapacity);
        }
        if (screenSize) {
          params.append("screenSize", screenSize);
        }
        if (minPrice) {
          params.append("minPrice", minPrice);
        }
        if (maxPrice) {
          params.append("maxPrice", maxPrice);
        }

        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: `/smartphone/get-all-products`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Phone"],
    }),
    getHistory: builder.query({
      query: (query) => {
        const params = new URLSearchParams();
        if (query) {
          params.append("filterBy", query);
        }
        console.log(params)
        return {
          url: "sales/get-all-sales",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Phone"],
    }),
    addProduct: builder.mutation({
      query: (data) => {
        console.log(data);
        return { url: "/smartphone/add-product", method: "POST", body: data };
      },
      invalidatesTags: ["Phone"],
    }),
    sellProduct: builder.mutation({
      query: (data) => {
        console.log(data)
        return { url: "/sales/create-sales", method: "POST", body: data };
      },
      invalidatesTags: ["Phone"],
    }),
    deleteProduct: builder.mutation({
      query: (pId) => {
        return { url: `/smartphone/delete-product/${pId}`, method: "DELETE" };
      },
      invalidatesTags: ["Phone"],
    }),
    allDeleteProduct: builder.mutation({
      query: (ids) => {
        return {
          url: `/smartphone/delete-products`,
          method: "DELETE",
          body: ids,
        };
      },
      invalidatesTags: ["Phone"],
    }),
    getSingleProduct: builder.query({
      query: (pId) => {
        return { url: `/smartphone/get-single-product/${pId}`, method: "GET" };
      },
      providesTags: ["Phone"],
    }),
    updateProduct: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/smartphone/update-product/${data.id}`,
          method: "PUT",
          body: data.productDataa,
        };
      },
      invalidatesTags: ["Phone"],
    }),
  }),
});
export const {
  useUpdateProductMutation,
  useAllDeleteProductMutation,
  useGetSingleProductQuery,
  useSellProductMutation,
  useGetHistoryQuery,
  useDeleteProductMutation,
  useGetProductQuery,
  useAddProductMutation,
} = smartapi;
