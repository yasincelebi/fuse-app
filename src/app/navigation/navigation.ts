import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [

    {
        id: 'sample',
        title: 'Kişiler',
        translate: 'NAV.SAMPLE.TITLE',
        type: 'item',
        icon: 'contacts',
        url: '/sample',
    },
    {
        id: 'sample',
        title: 'Frequently Contacted',
        type: 'item',
        icon: 'frequently-contacted',
        url: '/frequently',
    },
    {
        id: 'merge',
        title: 'Merge',
        type: 'item',
        icon: 'merge-fix',
        url: '/merge',
        showDividerAfter: true
    },
    {
        id: 'labels',
        title: 'Labels',
        type: 'collapsable',
        icon: 'labels',
        children: [
            {
                id: 'labels',
                title: 'Labels',
                type: 'item',
                icon: 'label',
                url: '/labels',
                badge    : {
                    title    : '1',
                }
            }
        ]
    },
    {
        id: 'create-label',
        title: 'Create Label',
        type: 'item',
        icon: 'create-label',
        url: '/create-label',
        showDividerAfter: true
    },
    {
        id: 'import',
        title: 'Import',
        type: 'item',
        icon: 'import',
        url: '/import',
    }, {
        id: 'export',
        title: 'Export',
        type: 'item',
        icon: 'export',
        url: '/export',
    }, {
        id: 'print',
        title: 'Print',
        type: 'item',
        icon: 'print',
        url: '/print',
        showDividerAfter: true

    }, {
        id: 'other-contacts',
        title: 'Other Contacts',
        type: 'item',
        icon: 'other-contacts',
        url: '/other-contacts',


    }, {
        id: 'trash',
        title: 'Trash',
        type: 'item',
        icon: 'trash',
        url: '/trash',
    }
];

export const NavigationIcons: INavigationIcons[] = [
    {
        name: 'contacts',
        path: 'contacts.svg'
    },
    {
        name: 'create-label',
        path: 'create-label.svg'
    },
    {
        name: 'export',
        path: 'export-icon.svg'
    },
    {
        name: 'import',
        path: 'import-icon.svg'
    },
    {
        name: 'frequently-contacted',
        path: 'frequently-contacted.svg'
    },
    {
        name: 'labels',
        path: 'labels.svg'
    },
    {
        name: 'merge-fix',
        path: 'merge-fix.svg'
    },
    {
        name: 'other-contacts',
        path: 'other-contacts.svg'
    },
    {
        name: 'print',
        path: 'print.svg'
    },
    {
        name: 'trash',
        path: 'trash.svg'
    },
    {
        name: 'google-plus',
        path: 'plus.svg'
    },
    {
        name: 'close',
        path: 'close.svg'
    },
    {
    name: 'photo',
    path: 'photo.svg'
    },
    {
        name: 'label',
        path: 'label.svg'
    },
    {
        name: 'edit',
        path: 'edit.svg'
    },
    {
        name: 'fav',
        path: 'fav.svg'
    },
    {
        name: 'three-dot',
        path: 'three-dot.svg'
    },
    {
        name: 'active-fav',
        path: 'active-fav.svg'
    }

];

export interface INavigationIcons {
    name: string;
    path: string;
}
