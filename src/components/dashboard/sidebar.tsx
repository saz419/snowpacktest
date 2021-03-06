import React, { FC, useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Group,
} from "@mantine/core";
import {
  Icon as TablerIcon,
  Home2,
  Gauge,
  DeviceDesktopAnalytics,
  Fingerprint,
  CalendarStats,
  User,
  Settings,
  Logout,
  SwitchHorizontal,
} from "tabler-icons-react";
import { connect } from "react-redux";
import { Dispatch, RootState } from "../../store";
import { UserType } from "../../store/models/user";
// import { MantineLogoSmall } from "../../shared/MantineLogo";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.white,
    opacity: 0.85,

    "&:hover": {
      opacity: 1,
      // backgroundColor: theme.colors[theme.primaryColor][5],
      border: "1px solid white",
    },
  },

  active: {
    opacity: 1,
    "&, &:hover": {
      backgroundColor: theme.colors.violet[9],
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: Home2, label: "Home" },
  { icon: Gauge, label: "Dashboard" },
  { icon: DeviceDesktopAnalytics, label: "Analytics" },
  { icon: CalendarStats, label: "Releases" },
  { icon: User, label: "Account" },
  { icon: Fingerprint, label: "Security" },
  { icon: Settings, label: "Settings" },
];

const useNavbarStyles = createStyles((theme) => ({
  navbar: {
    // backgroundColor: theme.colors[theme.primaryColor][6],
    backgroundColor: "#192057",
  },
}));

interface Props {
  setUser: (e: UserType) => {};
}

const NavbarMinimalColored: FC<Props> = ({ setUser, ...props }) => {
  const [active, setActive] = useState(2);
  const { classes } = useNavbarStyles();

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  const handleLogout = () => {
    setUser({
      name: "",
      email: "",
      loggedIn: false,
    });
  };

  return (
    <Navbar height={750} width={{ base: 80 }} p="md" className={classes.navbar}>
      <Center>{/* <MantineLogoSmall variant="white" /> */}</Center>
      <Navbar.Section grow mt={50}>
        <Group direction="column" align="center" spacing={0}>
          {links}
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        <Group direction="column" align="center" spacing={0}>
          <NavbarLink icon={SwitchHorizontal} label="Change account" />
          <NavbarLink icon={Logout} onClick={handleLogout} label="Logout" />
        </Group>
      </Navbar.Section>
    </Navbar>
  );
};

const mapState = (state: RootState) => ({});
const mapDispatch = (dispatch: Dispatch) => ({
  setUser: (e: UserType) => dispatch.user.setUser(e),
});

export default connect(mapState, mapDispatch)(NavbarMinimalColored);
