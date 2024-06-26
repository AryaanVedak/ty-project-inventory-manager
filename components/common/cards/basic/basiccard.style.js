import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: ({
    padding: SIZES.xLarge,
    margin: 4,
    backgroundColor: COLORS.gray,
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  logoContainer: ({
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "70%",
    height: "70%",
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    // marginTop: SIZES.large,
    // marginBottom: SIZES.medium
  },
  jobName: ({
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: "#FFF",
  }),
  jobNameMain: ({
    fontSize: SIZES.xxLarge,
    fontFamily: FONT.bold,
    color: "#FFF",
  }),
  jobNameMainEx: ({
    fontSize: SIZES.xxLarge,
    fontFamily: FONT.bold,
    color: "#FFF",
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
