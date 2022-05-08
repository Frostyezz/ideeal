import React, { useState, useMemo } from "react";

import FeedOptions from "../../components/Feed/FeedOptions";
import Post from "../../components/Post/Post";

import { ExclamationTriangleFill } from "react-bootstrap-icons";

import { Button } from "@chakra-ui/react";

const Favorites = ({ initialPosts }) => {
  const [sort, setSort] = useState({
    name: null,
    title: null,
    upvotes: null,
    modified: false,
    time: null,
    date: {
      from: null,
      to: null,
    },
  });

  const posts = useMemo(() => {
    const posts = initialPosts;
    if (sort.modified) {
      if (sort.name) {
        posts = posts.filter((post) =>
          `${post.author.firstName} ${post.author.lastName}`
            .toLowerCase()
            .includes(sort.name)
        );
      }
      if (sort.title) {
        posts = posts.filter((post) =>
          `${post.title} ${post.title}`.toLowerCase().includes(sort.title)
        );
      }
      if (sort.upvotes) {
        if (sort.upvotes === "ascending")
          posts.sort((a, b) => a.upvoters.length - b.upvoters.length);
        else posts.sort((a, b) => b.upvoters.length - a.upvoters.length);
      }
      if (sort.time) {
        if (sort.time === "newest") {
          posts.sort(function (a, b) {
            return (
              new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
            );
          });
        } else {
          posts.sort(function (a, b) {
            return (
              new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
            );
          });
        }
      }
      if (sort.date.from && sort.date.to) {
        if (+sort.date.from === +sort.date.to) {
          posts = posts.filter((post) => {
            const time = new Date(post.postedAt);
            return (
              time.getDay() === sort.date.from.getDay() &&
              time.getMonth() === sort.date.from.getMonth() &&
              time.getFullYear() === sort.date.from.getFullYear()
            );
          });
        } else {
          posts = posts.filter(
            (post) =>
              new Date(post.postedAt).getTime() >= sort.date.from.getTime() &&
              new Date(post.postedAt).getTime() <= sort.date.to.getTime()
          );
        }
      }
    }
    return posts;
  }, [initialPosts, sort]);

  return (
    <div className="min-h-screen bg-gray">
      <div className="flex flex-col mx-auto w-full md:w-2/4">
        <FeedOptions
          create={false}
          sortPosts={(filters) => setSort(filters)}
          resetFilters={() =>
            setSort({
              name: null,
              title: null,
              upvotes: null,
              modified: false,
              date: {
                from: null,
                to: null,
              },
            })
          }
        />
        {posts.length ? (
          <ul className="flex flex-col">
            {posts.map((post, i) => (
              <Post key={i} post={post} />
            ))}
          </ul>
        ) : (
          <div className="w-full h-screen flex flex-col justify-center items-center">
            <ExclamationTriangleFill className="text-9xl text-orange" />
            <h1 className="text-3xl font-bold">Nu există postări favorite!</h1>
            {sort.modified && (
              <>
                <span className="my-2">
                  Se pare că nicio postare nu respectă filtrele alese.
                </span>
                <Button
                  onClick={() =>
                    setSort({
                      name: null,
                      title: null,
                      upvotes: null,
                      modified: false,
                      date: {
                        from: null,
                        to: null,
                      },
                    })
                  }
                  colorScheme="blue"
                >
                  Resetează filtrele
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  try {
    const { id } = ctx.params;
    const baseURL = !process.env.VERCEL_URL
      ? "http://localhost:3000"
      : `https://${process.env.VERCEL_URL}`;
    const res = await fetch(`${baseURL}/api/post/favorites/${id}`);
    const data = await res.json();
    if (data.status === "SUCCESS" && data.posts)
      return { props: { initialPosts: data.posts } };
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  }
}

export default Favorites;
