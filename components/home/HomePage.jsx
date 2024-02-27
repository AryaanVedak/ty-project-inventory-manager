import Nearbyjobs from "./nearby/Nearbyjobs";
import Popularjobs from "./popular/Popularjobs";
import Welcome from "./welcome/Welcome";
import { ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { View } from "react-native";
import {COLORS, icons, images, SIZES} from '../../constants'
import { SafeAreaView } from "react-native";
import { ScreenHeaderBtn } from "../common/header/ScreenHeaderBtn"



const HomePage = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<ScrollView 
				showsVerticalScrollIndicator={false}
			>
				<View
					style={{ flex: 1, padding: SIZES.medium }}
				>
					<Welcome/>
					{/* <Popularjobs/> */}
					<Nearbyjobs/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default HomePage;