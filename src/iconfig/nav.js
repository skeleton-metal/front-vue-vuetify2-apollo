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
        permission: 'SECURITY_DASHBOARD_SHOW',
        children: [
            {
                icon: 'settings_applications',
                text: 'Customization',
                link: {name: "customization"},
                panel: false,
                permission: 'CUSTOMIZATION_SHOW'
            },
            {
                icon: 'assignment_ind',
                text: 'Users',
                link: {name: "usersAdmin"},
                panel: false,
                permission: 'SECURITY_USER_SHOW'
            },
            {
                icon: 'group',
                text: 'Groups',
                link: {name: "groupsAdmin"},
                panel: false,
                permission: 'SECURITY_GROUP_SHOW'
            },
            {
                icon: 'verified_user',
                text: 'Roles',
                link: {name: "rolesAdmin"},
                panel: false,
                permission: 'SECURITY_ROLE_SHOW'
            },

        ]
    }

]
