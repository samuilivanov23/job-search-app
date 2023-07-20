import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import useFetch from '../../../hook/useFetch';

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoadingState, error } = useFetch
  ('search', { 
    query: 'React developer',
    num_pages: 1
  });

  // console.log(data);

  return (
    <View style={styles.container}>
      {/* Header view */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      {/* Actual job cards view */}
      <View style={styles.cardsContainer}>
        {isLoadingState ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList 
            data = {data}
            renderItem={({ item }) => (
              <PopularJobCard 
                item={item} 
              />
            )}
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs