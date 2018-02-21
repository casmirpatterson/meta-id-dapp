import React from 'react'
import MediaQuery from 'react-responsive'
import { Box } from 'jaak-primitives'

import { Link, MetaIdentity } from 'core/components'
import { PrimaryButton, Image, Section, Text } from 'core/primitives'
import { routes } from 'core/routes'
import { breakpoints } from 'core/style'

const Anonymous = ({ exampleIdentity }) => (
  <Box flexDirection="column" size={['100%', 'auto']}>
    <Box
      flex="0 1 auto"
      margin={[0, 'auto']}
      padding={['16px', '16px', '32px']}
      size={['auto', '100%']}
      style={{ maxWidth: '1280px' }}
    >
      <Box>
        <Box>
          <Text
            fontSize="20px"
            fontWeight={900}
            margin={[0, 0, '16px']}
            textTransform="uppercase"
          >
            Massive Headline
          </Text>

          <Text fontSize="16px" fontWeight={700} margin={[0, 0, '24px']}>
            Awesome body copy blah blah blah. More awesome body copy blah blah
          </Text>

          <Link to={routes.register.path}>
            <PrimaryButton fontSize="18px" fontWeight={700}>
              Create your META-ID
            </PrimaryButton>
          </Link>
        </Box>

        <MediaQuery query={`(${breakpoints.MEDIUM})`}>
          <Section
            borderColor="white"
            borderWidth="1px"
            margin={[0, 0, 0, '32px']}
            padding={['32px', '24px']}
          >
            <MetaIdentity
              address={exampleIdentity.address}
              claims={exampleIdentity.claims}
              graph={exampleIdentity.graph}
            />
          </Section>
        </MediaQuery>
      </Box>
    </Box>

    <Box backgroundColor="white">
      <Image
        backgroundSize="cover"
        minHeight="540px"
        src="img/providers.png"
        size={['100%']}
      />
    </Box>
  </Box>
)

export default Anonymous
