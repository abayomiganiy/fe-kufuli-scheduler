const FontCodeToFont = (fontCode: number) => {
    let fontName;
    switch (fontCode) {
        case 0:
            fontName = "system-ui";
            break;
        case 8:
            fontName = '"Calistoga", serif';
            break;
        case 9:
            fontName = '"Exo 2", serif';
            break;
        case 10:
            fontName = '"Courier Prime", serif';
            break;
        // case 2:
        //     fontName = 'FB_SCRIPT';
        //     break;
        // case 7:
        //     fontName = 'MORNINGBREEZE_REGULAR';
        //     break;

        default:
            fontName = "system-ui";
            break;
    }

    return fontName;
};

export default FontCodeToFont;
