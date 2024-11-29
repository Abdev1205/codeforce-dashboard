import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";

export interface Contest {
  id: number;
  name: string;
  type: string;
  phase: string;
  startTimeSeconds: number;
  durationSeconds: number;
}

interface UseContestsOptions {
  initialType?: string;
}

const useContests = ({ initialType = "" }: UseContestsOptions = {}) => {
  const [searchParams] = useSearchParams();
  const [contests, setContests] = useState<Contest[]>([]);
  const [originalContests, setOriginalContests] = useState<Contest[]>(() => {
    const storedContests = localStorage.getItem("contests");
    return storedContests !== null ? JSON.parse(storedContests) : [];
  });
  const [favorites, setFavorites] = useState<number[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const searchQuery = searchParams.get("q") || "";
  const [selectedType, setSelectedType] = useState(initialType);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  // Update localStorage when favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  // Debounced search function to filter contests based on query
  const searchContests = useCallback(
    debounce((query: string) => {
      const lowercaseQuery = query.toLowerCase();
      const filtered = originalContests.filter((contest) =>
        contest.name.toLowerCase().includes(lowercaseQuery)
      );
      setContests(filtered);
    }, 500),
    [originalContests]
  );

  // Fetch contests once on initial render
  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://codeforces.com/api/contest.list"
        );
        const fetchedContests = response.data.result || [];
        localStorage.setItem("cachedContests", JSON.stringify(fetchedContests));
        setOriginalContests(fetchedContests);
        setContests(fetchedContests);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Fetch failed"));
      } finally {
        setLoading(false);
      }
    };

    if (originalContests.length == 0) {
      // if no contests in cache, fetch from API
      fetchContests();
    }
  }, []);

  // Process contests based on selected type
  const processedContests = contests
    .filter((contest) => (selectedType ? contest.type === selectedType : true))
    .map((contest) => ({
      ...contest,
      isFavorite: favorites.includes(contest.id),
    }));

  // Trigger search when the query changes
  useEffect(() => {
    if (searchQuery) {
      searchContests(searchQuery);
    } else {
      setContests(originalContests);
    }
  }, [searchQuery, originalContests, searchContests]);

  return {
    contests: processedContests,
    originalContests,
    loading,
    error,
    setSelectedType,
    selectedType,
    toggleFavorite,
    totalContests: processedContests.length,
  };
};

export default useContests;
