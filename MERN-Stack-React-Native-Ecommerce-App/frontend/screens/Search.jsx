import React, { useState, useEffect, useCallback } from "react"
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from "react-native"
import * as Icon from "react-native-feather"
import SearchTile from "../components/products/SearchTile"
import useFetch from "../hook/useFetch"
import { debounce } from "lodash"

const Search = () => {
  const [searchKey, setSearchKey] = useState("")
  const [displayedResults, setDisplayedResults] = useState([])
  const { data, isLoading, error } = useFetch()
  console.log(data)
  const performSearch = useCallback(
    (searchTerm) => {
      if (!searchTerm.trim()) {
        setDisplayedResults(data)
      } else {
        const filteredResults = data.filter((item) => item?.title?.toLowerCase().includes(searchTerm.toLowerCase()))
        setDisplayedResults(filteredResults)
      }
    },
    [data],
  )

  const debouncedSearch = useCallback(debounce(performSearch, 300), [performSearch])

  useEffect(() => {
    setDisplayedResults(data)
  }, [data])

  useEffect(() => {
    debouncedSearch(searchKey)
  }, [searchKey, debouncedSearch])

  const handleClearSearch = () => {
    setSearchKey("")
    setDisplayedResults(data)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search Products</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon.Search stroke="gray" width={20} height={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="What are you looking for?"
            placeholderTextColor="gray"
            onChangeText={(txt) => setSearchKey(txt)}
            value={searchKey}
          />
          {searchKey.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
              <Icon.X stroke="gray" width={20} height={20} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error.message}</Text>
        </View>
      ) : displayedResults.length === 0 ? (
        <View style={styles.centerContainer}>
          <Image source={item?.images[0]?.url} style={styles.searchImage} />
          <Text style={styles.noResultsText}>No results found</Text>
        </View>
      ) : (
        <FlatList
          data={displayedResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <SearchTile item={item} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  searchContainer: {
    padding: 16,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
  },
  clearButton: {
    padding: 4,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  noResultsText: {
    marginTop: 16,
    fontSize: 18,
    color: "#666666",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
})

export default Search

