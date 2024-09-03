import React, { useState } from 'react'
import { Textarea } from "flowbite-react";
import { useLoaderData, useParams } from 'react-router-dom';
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
const EditBooks= () => {
    const {id} = useParams();
    const {isbn, title, author, genre, price, image_url, description} = useLoaderData();

    const bookCategories = [
        "Fiction",
        "Non-Fiction",
        "Mystery",
        "Rrogramming",
        "Science Fiction",
        "Fantasy",
        "Horror",
        "Biography",
        "Autobiography",
        "History",
        "Self-help",
        "Memoir",
        "Business",
        "Children Books",
        "Adult",
        "Crime",
        "Travel",
        "Religion",
        "Art and Design",
        "Education"
      ]
      const [selectedBookgenre, setSelectedBookgenre] = useState(bookCategories[0]);
    
      const handleChangeSelectedValue = (event) => {
        //console.log(event.target.value);
        setSelectedBookgenre(event.target.value);
      }
      //handle book submission :3
      const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const isbn = form.isbn.value;
        const title = form.title.value;
        const author = form.author.value;
        const genre = form.genreName.value;
        const price = form.price.value;
        const image_url = form.image_url.value;
        const description = form.description.value;
        const updateBookObj = {
          isbn, title, author, price, genre, image_url, description
        }
        //console.log(bookObj);
        //update book data
        fetch(`https://bookstore-project-essg.onrender.com/api/books/${id}`, {method: "PATCH", headers: {"Content-type": "application/json"}, body: JSON.stringify(updateBookObj)}).then(res => res.json()).then(data => {
            alert("Book is updated successfully");
          })

      }
      return (
        <div className='px-4 my-12'>
          <h2 className='mb-8 text-3xl font-bold'>Update the book data</h2>
          <form onSubmit={handleUpdate} className="flex lg:w-[1080px] flex-col flex-wrap gap-4">
        {/* First row */}
        <div className='flex gap-8 '>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Book Title"/>
            </div>
            <TextInput id="title" name='title' type="text" placeholder="Book Name" defaultValue={title} required />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="author" value="Author Name" />
            </div>
            <TextInput id="author" name='author' type="text" placeholder="Author Name" defaultValue={author} required />
          </div>
        </div>
        {/* Second row */}
        <div className='flex gap-8 '>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="image_url" value="Book Image URL" />
            </div>
            <TextInput id="image_url" name='image_url' type="text" placeholder="Book Image URL" defaultValue={image_url} required />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Book Genre" />
            </div>
            <Select id="inputState" name='genreName' className='w-full rounded' value={selectedBookgenre} onChange={handleChangeSelectedValue} defaultValue={genre}>
              {
                bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
              }
            </Select>
          </div>
        </div>
        {/* Third row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="isbn" value="Book ISBN" />
            </div>
            <TextInput id="isbn" name='isbn' type="text" placeholder="ISBN Number" defaultValue={isbn} required />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Book Price" />
            </div>
            <TextInput id="price" name='price' type="number" placeholder="Book Price" defaultValue={price} required />
          </div>
        </div>
        {/* Description */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Book Description" />
          </div>
          <Textarea id="description" name='description' placeholder="Describe your book..." className='w-full' defaultValue={description} required rows={6} />
        </div>
        <Button type="submit" className='mt-5'>Upload Book</Button>
      </form>
        </div>
      )
}

export default EditBooks