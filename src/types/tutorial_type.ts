// # tutorial_images: FileList;
// # title: string;
// # price: string;
// # frontend_framework_option: string;
// # backend_framework_option: string;
// # description: string;
// # teacher: string;
// # tutorial_url: string;

export type ITutorialListType = [
    {
        pk: string;
        tutorial_image: string;
        title: string;
        price: string;
        frontend_framework_option: string;
        backend_framework_option: string;
        description: string;
        teacher: string;
        tutorial_url: string;
    }
];
