import { 
    Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl 
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from '../../hook/useFetch';

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
    //Get current job id and get react router
    const params = useSearchParams();
    const router = useRouter();

    const { data, isLoadingState, error, refetchData } = useFetch('job-details', {
        job_id: params.id
    });

    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetchData();
        setRefreshing(false);
    }, []);

    const displayTabContent = () => {
        switch (activeTab) {
            case "Qualifications":
                return <Specifics 
                    title="Qualifications"
                    points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
                />
            case "About":
                return <JobAbout 
                    info={data[0].job_description ?? "No data provided"}
                />
            case "Responsibilities":
                return <Specifics 
                    title="Responsibilities"
                    points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
                />
            default:
                break;
        }
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen 
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.left}
                            dimension={"60%"}
                            HandlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.share}
                            dimension={"60%"}
                        />
                    ),
                    headerTitle: ''
                }}
            />

            <>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    {isLoadingState ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : error ? (
                        <Text>Something went wrong!</Text>
                    ) : data.length === 0 ? (
                        <Text>No data</Text>
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                            <Company 
                                companyLogo={data[0].employer_logo}
                                jobTitle={data[0].job_title}
                                companyName={data[0].employer_name}
                                location={data[0].job_country}
                            />

                            <JobTabs 
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />

                            {displayTabContent()}
                        </View>
                    )}
                </ScrollView>

                {/* Always display at the bottom because it is out of the ScrollView component */}
                <JobFooter 
                    url={data[0]?.job_google_link ?? "https://careers.google.com/jobs/results"}
                />
            </>
        </SafeAreaView>
    )
}

export default JobDetails;