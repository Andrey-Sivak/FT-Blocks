<?php
/**
 * Class SampleTest
 *
 * @package FT_Blocks
 */

/**
 * Sample test case.
 */
class SampleTest extends WP_UnitTestCase
{

    /**
     * A single example test.
     */
    public function test_sample()
    {
        // Replace this with some actual testing code.
        $this->assertTrue(true);
    }

    /**
     * Test if constants are defined.
     */
    public function test_constants_defined()
    {
        $this->assertTrue(defined('FT_BLOCKS_PATH'));
        $this->assertTrue(defined('FT_BLOCKS_URL'));
    }
}
