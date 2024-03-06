import { Box, Button, Flex, Grid, GridItem, Card, Heading, Text, Textarea, Input } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const LayoutComponent = dynamic(() => import("@/layout"))
export default function AddNotes({ }) {
  const router = useRouter();
  const [notes, setNotes] = useState(
    {
      title: "",
      description: "",
    }
  );

  const handleSubmit = async () => {
    try {
      const result = await (await fetch('/api/notes/add', {
        method: 'POST',
        body: JSON.stringify(notes)
      })).json();
      if (result?.success) {
        router.push("/notes")
      }
    } catch (error) {

    }
  }

  // console.log("notes =>", notes)
  return (
    <>
      <LayoutComponent metaTitle="Notes" metaDescription="Semua informasi catatan" >
        <Card margin='5' padding='5'>
          <Heading>Add Notes</Heading>
          <Grid gap='5'>
            <GridItem>
              <Text>Title</Text>
              <Input type="text" onChange={(event) => setNotes({ ...notes, title: event.target.value })}></Input>
            </GridItem>
            <GridItem>
              <Text >Description</Text>
              <Textarea onChange={(event) => setNotes({ ...notes, description: event.target.value })} />
            </GridItem>
            <GridItem>
              <Button flex='1' colorScheme='blue' onClick={() => handleSubmit()}>
                Submit
              </Button>
            </GridItem>
          </Grid>
        </Card>
        {/* {notes.data.map((item) => (
          <div>
            <Link href={`/notes/${item.id}`}>{item.title}</Link>
          </div>
        ))} */}
      </LayoutComponent>

    </>
  )
}

// export async function getStaticProps() {
//   const res = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes')
//   const notes = await res.json()
//   return { props: { notes }, revalidate: 10 }
// }