import { Box, Button, Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const LayoutComponent = dynamic(() => import("@/layout"))
export default function Notes({ }) {
  const router = useRouter();
  const [notes, setNotes] = useState();
  useEffect(() => {
    async function fetchingData() {
      const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes")
      const listNotes = await res.json();
      setNotes(listNotes)
    }
    fetchingData();
  }, []);

  // console.log("notes =>", notes)
  return (
    <>
      <LayoutComponent metaTitle="Notes" metaDescription="Semua informasi catatan" >
        <Box padding='5'>
          <Flex justifyContent='end'>
            <Button colorScheme={'blue'} onClick={() => router.push("/notes/add")}>Add Notes</Button>
          </Flex>
          <Flex>
            <Grid templateColumns='repeat(3, 1fr)' gap={5}>
              {notes?.data?.map((item) => (
                <GridItem>
                  <Card>
                    <CardHeader>
                      <Heading>{item?.title}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>{item?.description}</Text>
                    </CardBody>
                    <CardFooter
                      justify='space-between'
                      flexWrap='wrap'
                    >
                      <Button flex='1' colorScheme='orange'>
                        Edit
                      </Button>
                      <Button flex='1' colorScheme='red' >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Box>
        {/* {notes.data.map((item) => (
          <div>
            <Link href={`/notes/${item.id}`}>{item.title}</Link>
          </div>
        ))} */}
      </LayoutComponent>

    </>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes')
  const notes = await res.json()
  return { props: { notes }, revalidate: 10 }
}