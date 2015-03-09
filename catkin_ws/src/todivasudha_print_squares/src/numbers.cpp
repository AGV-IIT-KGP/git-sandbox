#include "ros/ros.h"
#include "std_msgs/Int16.h"

using namespace std;

/*
  This node publishes integers on topic_numbers starting from 1 at a frequency of 1 hz
 */
int main(int argc, char **argv)
{
  /*
    the ros::init() function is called before using any part of the ros system. the third argument here is the name of the node.
   */
  ros::init(argc, argv, "numbers");

  /*
    NodeHandle is the main access point to communications with the ROS system.
    The first NodeHandle constructed will fully initialize this node, and the last
    NodeHandle destructed will close down the node.
   */
  ros::NodeHandle n;
  /*
   the advertise() function tells ros that we want to publish on a given topic.
   */
  ros::Publisher topic_numbers_pub = n.advertise<std_msgs::Int16>("topic_numbers", 1000);
  /*
   A ros::Rate object allows us to specify a frequency with which we would like to run the loop.
   (here 1hz)
  */

  ros::Rate loop_rate(1);

  /*
    A count of how many messages we have sent. it is used to increment the no. being published in each loop.
   */
  int count = 1;
  while (ros::ok())
  {
    /*
      This is a message object. We stuff it with data, and then publish it.
     */
    std_msgs::Int16 msg;
    msg.data = count;

    /*
     the publish function helps us to publish messagesand takes the msg object as its argument.
     */
    topic_numbers_pub.publish(msg);

    ros::spinOnce();

    loop_rate.sleep();
    ++count;
  }


  return 0;
}
