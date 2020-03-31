export default [
    {
        icon: 'mdi-home',
        text: 'Home',
        link: {name: "home"},
        panel: false
    },
    {
        icon: 'mdi-contact-phone',
        text: 'Admin',
        link: {name: "contact"},
        panel: false,
        children: [
            {
                icon: 'security',
                text: 'Users',
                link: {name: "usersAdmin"},
                panel: false
            },
            {
                icon: 'settings_applications',
                text: 'Customization',
                link: {name: "customization"},
                panel: false
            },
        ]
    }

]
