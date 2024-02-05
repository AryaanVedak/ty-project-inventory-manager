import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.primary,
    marginBottom: 15
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logImage: {
    width: "70%",
    height: "70%",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  jobName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: "black",
  },
  jobType: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
  button: {
    borderWidth: 0.5,
    borderRadius: 4,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPlus: {
    color: 'green',
    fontWeight: '600',
  },
  wrapperCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapperImageCheck: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
