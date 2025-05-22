export const getMovies = async ({ page = 1, limit = 8, search = "" } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    if (search.trim()) {
      params.append("search", search);
    }

    const response = await fetch(`/api/v1/movies_data?${params.toString()}`, {
      method: "GET",
      cache: "no-store", // Prevent caching
    });

    if (response.ok) {
      return response.json();
    } else {
      return { error: true, message: "Something went wrong!" };
    }
  } catch (error) {
    console.error("FETCH ERROR:", error);
    return { error: true, message: "Something went wrong!" };
  }
};
