import React from 'react'
import { Box } from 'jaak-primitives'

import { Link, MetaClaimsService } from 'core/components'
import { BodyLink, Image, Text } from 'core/primitives'
import { routes } from 'core/routes'
import { metaId } from 'core/util'

const Claims = ({ claims = [] }) => {
  const claimIssuerProfiles = metaId.getClaimIssuerProfilesFromClaims(
    Object.values(claims)
  )

  return claimIssuerProfiles.length ? (
    claimIssuerProfiles.map((profile, key) => {
      return <MetaClaimsService claimsService={profile} key={key} />
    })
  ) : (
    <Box align="middle" flexDirection="column" size={['100%', 'auto']}>
      <Image
        margin={['32px', 0]}
        size={['114px', '83px']}
        src="img/icon-provider.png"
      />

      <Text
        color="primary"
        fontSize="18px"
        fontWeight={700}
        maxWidth="310px"
        textAlign="center"
      >
        Head over to the&nbsp;
        <Link Component={BodyLink} to={routes.claim.path}>
          Providers
        </Link>
        &nbsp;tab to start connecting your IDs
      </Text>
    </Box>
  )
}

export default Claims
