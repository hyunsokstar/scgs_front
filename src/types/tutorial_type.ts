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
        pk: number;
        author: {
            username: string;
        };
        tutorial_image: string;
        title: string;
        price: string;
        frontend_framework_option: string;
        backend_framework_option: string;
        description: string;
        teacher: string;
        tutorial_url: string;
        like_count: number;
        unlike_count: number;
    }
];

export interface ITypeForTutorialUpdate {
    pk: number;
    tutorial_image: string;
    title: string;
    price: string;
    frontend_framework_option: string;
    backend_framework_option: string;
    description: string;
    teacher: string;
    tutorial_url: string;
}
