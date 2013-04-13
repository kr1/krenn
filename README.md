KRENN - diagrams
----------------

1.  WHAT IS KRENN?

    krenn diagrams are a way to *visualize* (and *navigate*) **data**. It works best for a certain classes of data:  
    appropriate data:
    
    >    * a (very) limited number of symmetric connected vertices of a graph (also with weighed distances).
    >    * items tagged with (partly) overlaying tags


2.  **Usage/Example:**
    example for plain svg:
    open `krenn_self_contained.svg` in your browser

    svg embedded in a html-file:
    open `example.html` in your browser


3.  **Configuration:**
    
    1.  **diagram types:**
        there are currently **3 types** of diagrams:
          
          1.   **flower:**  
               around a centerfield there are the connected fields.  
![flower type](http://github.com/kr1/krenn/raw/master/static/flower_type.png)
          
          2.  **flagpole:**    
              from the vertical centerfield on the left the connected fields overlay and continue to the right (overlays are proportional to the weight of the connection)  
![flagpole type](http://github.com/kr1/krenn/raw/master/static/flagpole_type.png)

          3.  **shelve:**  
              between 2 vertical centerfields there are the horizontal connected field (overlays are proportional to the weight of the connection)  
![shelve type](http://github.com/kr1/krenn/raw/master/static/shelve_type.png "")


    2.  **navigation** (link-) configurations:
        there are 2 types of mapping between the elements of the diagram
      
          1.  ***hash-based*** **mapping**
              a supplied hash with the ID as key and the link-target as value will connect clicks and URLs

          2.  ***function-based*** **mapping**
              if you supply a function that uses the ID and produces a URL it will be hooked up to the click-event

    3. other configurations
    
         1.  modify the configuration section of krenn.svg (dimensions, colors, transparency)
         2.  modify the source-code which is quite straight-forward


4.  **License**
    
    GNU General Public License

5.  **Copyright**
    
    Copyright Christian Wörner, 2009-2013 <christianworner[at{gmail}dot]com>
 
