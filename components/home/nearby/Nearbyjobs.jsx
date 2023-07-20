import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';

import styles from './nearbyjobs.style';
import { COLORS } from '../../../constants';
import useFetch from '../../../hook/useFetch';

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoadingState, error } = useFetch
  ('search', { 
    query: 'React developer',
    num_pages: 1
  });

  return (
    <View style={styles.container}>
      {/* Header view */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
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
          data?.map((job) => (
            <NearbyJobCard 
              job={job}
              key={`nearby-jon-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default Nearbyjobs;