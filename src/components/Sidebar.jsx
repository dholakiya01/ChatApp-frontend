import React, { useState, useRef, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Drawer, Avatar, Badge, List, ListItem, ListItemAvatar, ListItemText, Divider, Box, TextField, InputAdornment, Paper, Button, useMediaQuery, } from "@mui/material";
import { Menu, Search, Video, LogOut, Send, Paperclip, Smile, MoveRight, Check, Bell, CheckCheck, LogOutIcon, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { finduser, logoutuser } from "@/app/_api/user";
import { Getmessages, Sendmessage } from "@/app/_api/messages";
import toast from "react-hot-toast";
import { logoutSuccess } from "@/redux/userSlice";
import { useRouter } from "next/navigation";
import { setMessages } from "@/redux/messageSlice";
import UseGetotherUser from "@/hooks/UseGetotherUser";
import Notifications from "./Notifications";

const palette = {
    dark: "#2F5249",
    primary: "#437057",
    light: "#97B067",
    accent: "#E3DE61",
};

export default function Sidebar() {
    UseGetotherUser();
    const { authUser, onlineUser, token } = useSelector(store => store.user);
    const { messages } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const router = useRouter();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [mockUsers, setMockusers] = useState([]);
    const [activeUser, setActiveUser] = useState();
    const [mockMessages, SetmockMessages] = useState([]);
    const [onlineStatuses, setOnlineStatuses] = useState({});
    const [text, setText] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const isMdUp = useMediaQuery("(min-width:768px)"); // md breakpoint ~ laptop
    const messagesRef = useRef(null);

    useEffect(() => {
        if (!mockUsers) return;
        const statuses = {};
        mockUsers.forEach(u => {
            statuses[u._id] = onlineUser?.includes(u._id) ?? false;
        });
        setOnlineStatuses(statuses);
    }, [mockUsers, onlineUser]);
    // then when rendering a particular user:
    const status = onlineStatuses[activeUser?._id];

    const handleLogout = async () => {
        try {
            const response = await logoutuser(token);
            if (response.status == 200) {
                toast.success(response.data.msg || "Logout");
                dispatch(logoutSuccess());  // ✅ must dispatch
                router.push('/login');
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg || "Something went wrong!")
        }
    }

    useEffect(() => {
        // scroll to bottom on messages update
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        };
    }, [messages, activeUser]);

    useEffect(() => {
        const messageGet = async () => {
            try {
                const response = await Getmessages(activeUser, token);
                SetmockMessages(response.data); // <-- use correct state setter
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        if (activeUser && token) {
            messageGet();
        }
    }, [activeUser, token, messages]); // include token here

    useEffect(() => {
        async function Getuser() {
            try {
                const response = await finduser(token);
                setLoading(false);
                setMockusers(response.data.data);
                return response;
            } catch (error) {
                console.log(error, "error50");
            }
        }
        Getuser();
    }, []);

    async function sendMessage(e) {
        try {
            e?.preventDefault();
            const trimmed = text.trim();
            if (!trimmed) return;
            const response = await Sendmessage(activeUser, text, token);
            dispatch(setMessages([...messages, response.data.newmessage]));
            setText("");
        }
        catch (error) {
            toast.error(error?.response?.data || error?.response?.data?.msg || 'Something went wrong')
        }
    }

    const filtered = mockUsers.filter((u) => u?.fullName.toLowerCase().includes(search.toLowerCase()));

    // Sidebar content (used in Drawer & desktop)
    const sidebar = (
        <div className="h-full flex flex-col">
            <div className="p-4">
                <div className="flex items-center gap-3">
                    <Avatar src={authUser?.profilePhoto}>{authUser?.fullName?.charAt(0)}</Avatar>
                    <div>
                        <div className="text-lg font-semibold" style={{ color: palette.dark }}>
                            {authUser?.fullName?.toUpperCase()}
                        </div>
                        <div className="text-xs text-gray-500">Available</div>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <IconButton aria-label="logout" size="small" className="hover:bg-transparent"><Notifications palette={palette} /></IconButton>
                        <IconButton aria-label="logout" size="small" className="hover:bg-transparent">
                            <LogOut size={18} color={palette.dark} onClick={handleLogout} />
                        </IconButton>
                    </div>
                </div>

                <div className="mt-4">
                    <TextField
                        size="small"
                        placeholder="Search..."
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={16} color="#6b7280" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                background: "#fff",
                            },
                        }}
                    />
                </div>
            </div>

            <Divider />

            <Box className="flex-1 overflow-y-auto thin-scroll">
                <List>
                    {filtered.length === 0 && (
                        <div className="p-4 text-sm text-gray-500">No users found</div>
                    )}
                    {filtered.map((u) => (
                        <ListItem
                            key={u?._id}
                            button
                            onClick={() => {
                                setActiveUser(u);
                                if (!isMdUp) setMobileOpen(false);
                            }}
                            className={`px-4 py-2 ${u._id === activeUser?._id ? "bg-[rgba(67,112,87,0.06)]" : "hover:bg-[rgba(47,82,73,0.03)]"}`}
                        >
                            <ListItemAvatar>
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                    variant="dot"
                                    sx={{
                                        "& .MuiBadge-badge": {
                                            backgroundColor: onlineStatuses[u?._id] ? "green" : "gray",
                                            color: onlineStatuses[u?._id] ? "green" : "gray",
                                            borderRadius: "50%",
                                            height: "15px",
                                            minWidth: "15px",
                                            border: "2px solid white", // white border to look clean
                                        },
                                    }}
                                >
                                    <Avatar src={u?.profilePhoto}
                                        sx={{
                                            bgcolor: palette.primary,
                                            width: 48,
                                            height: 48,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {u.initials}
                                    </Avatar>
                                </Badge>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<span className="font-medium" style={{ color: palette.dark }}>{u?.fullName}</span>}
                                secondary={<span className="text-xs text-gray-500 truncate">{u?.message || '-'}</span>}
                            />
                            {u.unread > 0 && (
                                <div
                                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                                    style={{ background: palette.accent, color: palette.dark }}
                                >
                                    {u.unread}
                                </div>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Divider />
            <div className="p-3 flex items-center gap-3">
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        background: `linear-gradient(90deg, ${palette.primary}, ${palette.light})`,
                        color: "#fff",
                        "&:hover": { background: `linear-gradient(90deg, ${palette.primary}, ${palette.light})` },
                        borderRadius: "10px",
                        textTransform: "none",
                    }}
                >
                    New Chat
                </Button>
                <IconButton aria-label="settings">
                    <Settings className="animate-spin [animation-duration:3s]"/>
                </IconButton>
            </div>
        </div>
    );

    return (
        <div className="w-full h-screen bg-gray-50 flex">
            {/* Desktop sidebar */}
            <nav className="hidden md:block w-80 lg:w-96 border-r" style={{ borderRightColor: "rgba(47,82,73,0.06)" }}>
                {sidebar}
            </nav>

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                ModalProps={{ keepMounted: true }}
                variant="temporary"
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": { width: "86vw", maxWidth: 360 },
                }}
            >
                {sidebar}
            </Drawer>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                <AppBar position="static" color="transparent" elevation={1} className="bg-white">
                    <Toolbar className="px-3 md:px-6">
                        {!isMdUp && (
                            <IconButton edge="start" onClick={() => setMobileOpen(true)} aria-label="open sidebar">
                                <Menu size={20} color={palette.dark} />
                            </IconButton>
                        )}

                        <div className="flex items-center gap-3 ml-2">
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                variant="dot"
                                sx={{
                                    "& .MuiBadge-badge": {
                                        backgroundColor: status ? "green" : "gray",
                                        color: status ? "green" : "gray",
                                        borderRadius: "50%",
                                        height: "15px",
                                        minWidth: "15px",
                                        border: "2px solid white", // white border to look clean
                                    },
                                }}
                            >
                                <Avatar
                                    src={activeUser?.profilePhoto}
                                    sx={{
                                        bgcolor: palette.primary,
                                        width: 40,
                                        height: 40,
                                        fontWeight: 700,
                                    }}
                                    alt={activeUser?.fullName}
                                >
                                    {activeUser?.initials}
                                </Avatar>
                            </Badge>
                            <div>
                                <div className="font-semibold" style={{ color: palette.dark }}>{activeUser?.fullName}</div>
                                <div className="text-xs text-gray-500">{`${status ? 'online' : 'offline'}`}</div>
                            </div>
                        </div>

                        <div className="ml-auto flex items-center gap-2">
                            <IconButton aria-label="call">
                                <Video size={18} color={palette.dark} />
                            </IconButton>
                            <IconButton aria-label="more">
                                <LogOutIcon/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>

                <main className="flex-1 overflow-hidden flex flex-col" style={{ background: `linear-gradient(180deg, rgba(227,222,97,0.02), transparent)` }}>
                    <div
                        ref={messagesRef}
                        className="flex-1 overflow-auto p-6 thin-scroll"
                        style={{ WebkitOverflowScrolling: "touch" }}
                    >
                        {loading ? (
                            <h2 className="flex items-center justify-center">Loading...</h2>
                        ) : mockMessages && mockMessages.length > 0 ? (
                            <div className="max-w-3xl mx-auto space-y-4">
                                {mockMessages.map((m, i) => {
                                    const isMyMessage = m.senderId === authUser._id;

                                    return (
                                        <div
                                            key={m._id || i}
                                            className={`flex items-end gap-3 ${isMyMessage ? "justify-end" : "justify-start"}`}
                                        >
                                            {/* Avatar only for other user */}
                                            {!isMyMessage && (
                                                <Avatar src={activeUser?.profilePhoto} sx={{ bgcolor: palette.primary, width: 36, height: 36 }}>
                                                </Avatar>
                                            )}

                                            <Paper
                                                elevation={0}
                                                className={`px-4 py-2 rounded-2xl max-w-[78%] ${isMyMessage ? "text-white" : "text-[var(--chat-dark)]"
                                                    }`}
                                                style={{
                                                    background: isMyMessage
                                                        ? `linear-gradient(90deg, ${palette.primary}, ${palette.light})`
                                                        : "#fff",
                                                    boxShadow: isMyMessage
                                                        ? "0 8px 22px rgba(67,112,87,0.12)"
                                                        : "0 3px 10px rgba(15,23,42,0.04)",
                                                }}
                                            >
                                                <div
                                                    className="text-sm"
                                                    style={{ color: isMyMessage ? "#fff" : palette.dark }}
                                                >
                                                    {m?.message}
                                                </div>
                                                <div className="text-xs mt-1 text-black text-right flex items-center gap-1">
                                                    {m?.createdAt
                                                        ? new Date(m.createdAt).toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })
                                                        : ""}
                                                    {isMyMessage && (
                                                        onlineUser?.includes(activeUser?._id) ? (
                                                            <span>
                                                                <CheckCheck size={15} color="#545454" />
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                <Check size={15} color="#545454"/>
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </Paper>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                No messages yet
                            </div>
                        )}

                    </div>

                    {/* Composer */}
                    <Box component="form" onSubmit={sendMessage} className="border-t bg-white p-4">
                        <div className="max-w-3xl mx-auto flex items-center gap-3">
                            <IconButton aria-label="attach" size="large" className="p-2">
                                <Paperclip size={18} color={palette.dark} />
                            </IconButton>
                            <IconButton aria-label="emoji" size="large" className="p-2">
                                <Smile size={18} color={palette.dark} />
                            </IconButton>

                            <TextField
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Write a message..."
                                fullWidth
                                size="small"
                                InputProps={{
                                    sx: { borderRadius: "999px", paddingLeft: 2 },
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    ml: 1,
                                    minWidth: 44,
                                    height: 44,
                                    borderRadius: "999px",
                                    background: `linear-gradient(90deg, ${palette.primary}, ${palette.light})`,
                                    boxShadow: "0 6px 18px rgba(67,112,87,0.12)",
                                }}
                                aria-label="send message"
                            >
                                <Send size={16} color="#fff" />
                            </Button>
                        </div>
                    </Box>
                </main>
            </div>
        </div>
    );
}