import React, { Fragment } from 'react'
import { Box } from 'jaak-primitives'

import { MetaIdDisplay } from 'core/components'
import { PROFILE_IMAGE_DEFAULT } from 'core/constants'
import { FileInputLabel, Image, Input, Text } from 'core/primitives'
import { metaId, readFileAsDataURL, toCapitalised } from 'core/util'

const MetaIdentity = ({
  address,
  claims = [],
  graph,
  onProfileImageChange,
}) => {
  // TODO - move profile claim selector to a memoized function
  const profile = metaId.getProfileClaimsKeyedBySubProperty(
    metaId.getProfileClaimsFromMetaIdentityClaims(Object.values(claims))
  )

  const renderProfileImage = (
    <Image
      backgroundSize="cover"
      borderRadius="11px"
      size={['130px', '130px']}
      src={(profile.image && profile.image.claim) || PROFILE_IMAGE_DEFAULT}
    />
  )

  return (
    <Box>
      <Box flex="none" margin={[0, '32px', 0, 0]} size={['auto', '130px']}>
        {onProfileImageChange ? (
          <Fragment>
            <FileInputLabel
              backgroundColor="none"
              htmlFor="uploadProfileImage"
              padding={[0]}
            >
              {renderProfileImage}
            </FileInputLabel>

            <Input
              display="none"
              id="uploadProfileImage"
              onChange={({ target: { files: [file] } }) =>
                readFileAsDataURL(file).then(onProfileImageChange)
              }
              type="file"
            />
          </Fragment>
        ) : (
          renderProfileImage
        )}
      </Box>

      <Box align="right" flexDirection="column">
        <Text fontSize="32px" fontWeight={700}>
          {profile.name && toCapitalised(profile.name.claim)}
        </Text>

        <Text fontSize="16px" fontWeight={700} margin={[0, 0, '8px']}>
          <MetaIdDisplay username={graph} />
        </Text>

        {address && (
          <Text
            borderColor="accent"
            borderRadius="4px"
            borderWidth="1px"
            fontWeight={700}
            padding={['8px']}
            size={['auto', 'max-content']}
          >
            {address}
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default MetaIdentity
