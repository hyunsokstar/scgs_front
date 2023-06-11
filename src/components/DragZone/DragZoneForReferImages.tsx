import { useState } from "react";
import { Box, IconButton, Image, Spinner, Text } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";

interface ReferImage {
  pk: any;
  image_url: string;
}

interface DragZoneForReferImagesProps {
  refer_images: ReferImage[];
  taskPk: any;
}

const DragZoneForReferImages: React.FC<DragZoneForReferImagesProps> = ({
  refer_images,
  taskPk
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <Box>
        {/* {isUploadingForRefImage && <Spinner size="md" color="blue.1000" />} */}
      </Box>
      <Box flex="3" border="0px solid green">
        <Box
          width="100%"
          overflowY="scroll"
          height="618px"
          // onDragOver={handleDragOver}
          // onDragLeave={handleDragLeave}
          // onDrop={handleDrop}
          border="1px solid green"
        >
          <Box border="1px solid green" textAlign="center">
            {/* ModalButtonForShowReferImagesForTask component */}
          </Box>

          {refer_images && refer_images.length ? (
            refer_images.map((row: ReferImage) => (
              <a
                href={row.image_url}
                target="_blank"
                rel="noreferrer"
                key={row.pk}
              >
                <Box
                  position="relative"
                  zIndex="2"
                  paddingY={0}
                  _hover={{ border: "skyblue", opacity: 0.7 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <IconButton
                    icon={
                      <Box display="flex" justifyContent="center">
                        <FaTimes />
                      </Box>
                    }
                    position="absolute"
                    top="8px"
                    mt={0}
                    mr={2}
                    right={0}
                    size="sm"
                    zIndex={10}
                    display={isHovering ? "block" : "none"}
                    onClick={(e) => {
                      e.preventDefault();
                      // delete_lef_image_handler(row.pk);
                    }}
                    aria-label=""
                  />
                  <Image src={row.image_url} height="200px" width="100%" />
                </Box>
              </a>
            ))
          ) : (
            <Box>
              <Text>참고 이미지(드래그앤 드롭 가능)</Text>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default DragZoneForReferImages;
