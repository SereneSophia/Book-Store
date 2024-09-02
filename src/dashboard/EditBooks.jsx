import React, { useState } from 'react'
import { Textarea } from "flowbite-react";
import { useLoaderData, useParams } from 'react-router-dom';
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
const EditBooks= () => {
    const {id} = useParams();
    const {bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL} = useLoaderData();

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
      const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);
    
      const handleChangeSelectedValue = (event) => {
        //console.log(event.target.value);
        setSelectedBookCategory(event.target.value);
      }
      //handle book submission :3
      const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const bookTitle = form.bookTitle.value;
        const authorName = form.authorName.value;
        const imageURL = form.imageURL.value;
        const category = form.categoryName.value;
        const bookDescription = form.bookDescription.value;
        const bookPDFURL = form.bookPDFURL.value;
        const updateBookObj = {
          bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL
        }
        //console.log(bookObj);
        //update book data
        fetch('http://localhost:5000/book/${id}', {method:"PATCH", headers: {"Content-Type": "application/jason"}, body: JASON.strigify(updateBookObj)}).then(res => res.json()).then(data => {
            alert("Book is updated successfully");
          })

      }
      return (
        <div className='px-4 my-12'>
          <h2 className='mb-8 text-3xl font-bold'>Update the book data</h2>
          <form onSubmit={handleUpdate} className="flex lg:w-[1080px] flex-col flex-wrap gap-4">
            {/*first row */}
            <div className='flex gap-8 '>
              <div className='lg:w-1/2'>
                <div className="mb-2 block">
                  <Label htmlFor="bookTitle" value="Book Title" />
                </div>
                <TextInput id="bookTitle" name='bookTitle' placeholder="Book Name" required type="text" defaultValue={bookTitle}/>
              </div>
              {/*Author Name */}
              <div className='lg:w-1/2'>
                <div className="mb-2 block">
                  <Label htmlFor="authorName" value="Author Name" />
                </div>
                <TextInput id="authorName" name='authorName'  placeholder="Author Name" required type="text" defaultValue={authorName} />
              </div>
            </div>
            {/*second row*/}
            <div className='flex gap-8 '>
              <div className='lg:w-1/2'>
                <div className="mb-2 block">
                  <Label htmlFor="imageURL" value="Book Image URL" />
                </div>
                <TextInput id="imageURL" name='imageURL' placeholder="Book Image URL" required  type="text" defaultValue={imageURL}/> 
              </div>
              {/*Category */}
              <div className='lg:w-1/2'>
                <div className="mb-2 block">
                  <Label htmlFor="inputState" value="Book Category" />
                </div>
                <Select id="inputState" name='categoryName' className='w-full rounded' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
                  {
                    bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
                  }
    
                </Select>
              </div>
            </div>
            {/*descriptions*/}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="bookDescription" value="Book Discription" />
              </div>
              <Textarea id="bookDescription" name='bookDescription' placeholder="Describe about your book..." className='w-full' required rows={6} defaultValue={bookDescription}/>
              
            </div>
    
            {/*pdf link*/}
            <div>
            <div className="mb-2 block">
              <Label htmlFor="bookPDFURL" value="Book PDF URL" />
            </div>
            <TextInput id="bookPDFURL" name='bookPDFURL' placeholder="Enter your PDF URL" required type="text" defaultValue={bookPDFURL}/>
          </div>
          <Button type="submit" className='mt-5'>Update book</Button>
    
        </form>
        </div>
      )
}

export default EditBooks